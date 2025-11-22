import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface UserRoleEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    id: string;
    full_name: string;
    email: string;
    role: string;
  } | null;
  onUpdate: () => void;
}

export const UserRoleEditModal = ({ isOpen, onClose, user, onUpdate }: UserRoleEditModalProps) => {
  const [selectedRole, setSelectedRole] = useState(user?.role || "staff");
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateRole = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('user_roles')
        .update({ role: selectedRole as 'admin' | 'staff' | 'volunteer' })
        .eq('user_id', user.id);

      if (error) throw error;

      toast.success(`Role updated to ${selectedRole} for ${user.full_name}`);
      onUpdate();
      onClose();
    } catch (error: any) {
      toast.error("Failed to update role: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User Role</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div>
            <p className="text-sm font-medium mb-1">User</p>
            <p className="text-sm text-muted-foreground">{user?.full_name}</p>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Select Role</p>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="staff">Staff Member</SelectItem>
                <SelectItem value="coordinator">Coordinator</SelectItem>
                <SelectItem value="admin">Administrator</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleUpdateRole} disabled={isLoading} className="flex-1">
              {isLoading ? "Updating..." : "Update Role"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
