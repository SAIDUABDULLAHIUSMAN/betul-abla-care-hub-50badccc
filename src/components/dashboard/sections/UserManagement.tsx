import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, UserX, UserCheck } from "lucide-react";

export const UserManagement = () => {
  // Mock data for demonstration
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "staff", status: "active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "coordinator", status: "active" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", role: "staff", status: "inactive" },
  ];

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

  const getStatusColor = (status: string) => {
    return status === 'active' 
      ? 'bg-hope text-hope-foreground' 
      : 'bg-destructive text-destructive-foreground';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
          <p className="text-muted-foreground">
            Manage staff accounts and permissions.
          </p>
        </div>
        <Button>Add New User</Button>
      </div>

      <div className="space-y-4">
        {users.map((user) => (
          <Card key={user.id}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{user.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
                <div className="flex gap-2">
                  <Badge className={getRoleColor(user.role)}>
                    {user.role}
                  </Badge>
                  <Badge className={getStatusColor(user.status)}>
                    {user.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                <Button size="sm" variant="outline" className="text-hope hover:text-hope">
                  <UserCheck className="h-3 w-3 mr-1" />
                  Activate
                </Button>
                <Button size="sm" variant="outline" className="text-destructive hover:text-destructive">
                  <UserX className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};