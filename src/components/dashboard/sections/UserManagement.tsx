import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Edit, Trash2, KeyRound, Mail, Calendar, CheckCircle, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { UserRoleEditModal } from "../modals/UserRoleEditModal";
import { format } from "date-fns";

interface User {
  id: string;
  full_name: string;
  email: string;
  role: string;
  created_at: string;
  last_sign_in: string | null;
  email_confirmed: boolean;
}

export const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchUsers = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast.error("You must be logged in");
        return;
      }

      const response = await supabase.functions.invoke("admin-manage-users", {
        body: { action: "list_users" },
      });

      if (response.error) throw response.error;

      setUsers(response.data.users || []);
    } catch (error: any) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEditRole = (user: User) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleDeleteUser = async () => {
    if (!deleteUserId) return;

    setIsDeleting(true);
    try {
      const response = await supabase.functions.invoke("admin-manage-users", {
        body: { action: "delete_user", userId: deleteUserId },
      });

      if (response.error) throw response.error;

      toast.success("User deleted successfully");
      setDeleteUserId(null);
      fetchUsers();
    } catch (error: any) {
      toast.error("Failed to delete user: " + error.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleResetPassword = async (userId: string, email: string) => {
    try {
      const response = await supabase.functions.invoke("admin-manage-users", {
        body: { action: "reset_password", userId },
      });

      if (response.error) throw response.error;

      toast.success(`Password reset email sent to ${email}`);
    } catch (error: any) {
      toast.error("Failed to send reset email: " + error.message);
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-primary text-primary-foreground';
      case 'coordinator':
        return 'bg-hope text-hope-foreground';
      case 'staff':
        return 'bg-secondary text-secondary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
        <p className="text-muted-foreground">Loading users...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
          <p className="text-muted-foreground">
            Manage user accounts, roles, and permissions.
          </p>
        </div>
        <Badge variant="outline" className="text-lg px-4 py-2">
          {users.length} Total Users
        </Badge>
      </div>

      <div className="grid gap-4">
        {users.map((user) => (
          <Card key={user.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <CardTitle className="text-lg flex items-center gap-2">
                    {user.full_name}
                    {user.email_confirmed ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-muted-foreground" />
                    )}
                  </CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-3 w-3" />
                    {user.email}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Joined {format(new Date(user.created_at), "MMM d, yyyy")}
                    </div>
                    {user.last_sign_in && (
                      <div>
                        Last login {format(new Date(user.last_sign_in), "MMM d, yyyy")}
                      </div>
                    )}
                  </div>
                </div>
                <Badge className={getRoleColor(user.role)}>
                  {user.role}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => handleEditRole(user)}
                >
                  <Edit className="h-3 w-3 mr-1" />
                  Change Role
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => handleResetPassword(user.id, user.email)}
                >
                  <KeyRound className="h-3 w-3 mr-1" />
                  Reset Password
                </Button>
                <Button 
                  size="sm" 
                  variant="destructive" 
                  onClick={() => setDeleteUserId(user.id)}
                >
                  <Trash2 className="h-3 w-3 mr-1" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <UserRoleEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={selectedUser}
        onUpdate={fetchUsers}
      />

      <AlertDialog open={!!deleteUserId} onOpenChange={(open) => !open && setDeleteUserId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this user? This action cannot be undone. 
              All user data including their profile and role assignments will be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteUser}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete User"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
