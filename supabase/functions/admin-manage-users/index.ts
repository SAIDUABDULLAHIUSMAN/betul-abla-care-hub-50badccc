import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Denv.get("SUPABASE_URL") ?? "",
      Denv.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      {
        auth: {
          persistSession: false,
        },
      }
    );

    // Verify the requesting user is an admin
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("No authorization header");
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(token);

    if (authError || !user) {
      throw new Error("Unauthorized");
    }

    // Check if user has admin role
    const { data: roleData } = await supabaseClient
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .single();

    if (!roleData) {
      throw new Error("User is not an admin");
    }

    const { action } = await req.json();

    if (action === "list_users") {
      // Get all users with their profiles and roles
      const { data: profiles, error: profilesError } = await supabaseClient
        .from("profiles")
        .select(`
          id,
          full_name,
          created_at,
          updated_at
        `)
        .order("created_at", { ascending: false });

      if (profilesError) throw profilesError;

      // Get all user roles
      const { data: roles } = await supabaseClient
        .from("user_roles")
        .select("user_id, role");

      // Get auth users to get emails
      const { data: { users: authUsers }, error: usersError } = await supabaseClient.auth.admin.listUsers();
      
      if (usersError) throw usersError;

      // Combine the data
      const usersWithDetails = profiles?.map(profile => {
        const authUser = authUsers?.find(u => u.id === profile.id);
        const userRole = roles?.find(r => r.user_id === profile.id);
        
        return {
          id: profile.id,
          full_name: profile.full_name || "No Name",
          email: authUser?.email || "No Email",
          role: userRole?.role || "staff",
          created_at: profile.created_at,
          last_sign_in: authUser?.last_sign_in_at,
          email_confirmed: authUser?.email_confirmed_at ? true : false,
        };
      });

      return new Response(JSON.stringify({ users: usersWithDetails }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "delete_user") {
      const { userId } = await req.json();
      
      // Delete user from auth (this will cascade to profiles and user_roles via foreign keys)
      const { error: deleteError } = await supabaseClient.auth.admin.deleteUser(userId);
      
      if (deleteError) throw deleteError;

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "reset_password") {
      const { userId } = await req.json();
      
      // Get user email
      const { data: { user: targetUser } } = await supabaseClient.auth.admin.getUserById(userId);
      
      if (!targetUser?.email) {
        throw new Error("User not found");
      }

      // Send password reset email
      const { error: resetError } = await supabaseClient.auth.resetPasswordForEmail(
        targetUser.email,
        {
          redirectTo: `${Denv.get("SUPABASE_URL")}/auth/v1/verify`,
        }
      );

      if (resetError) throw resetError;

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    throw new Error("Invalid action");

  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
