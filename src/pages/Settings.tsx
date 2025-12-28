import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Server, Database, Key, Globe, Bell, Shield } from 'lucide-react';

const Settings = () => {
  return (
    <MainLayout title="Settings" subtitle="Configure your application settings">
      <div className="max-w-4xl space-y-6">
        {/* API Configuration */}
        <Card className="shadow-elegant">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Server className="h-5 w-5" />
              </div>
              <div>
                <CardTitle>Django API Configuration</CardTitle>
                <CardDescription>
                  Configure the connection to your Django REST Framework backend
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="api-url">API Base URL</Label>
              <div className="flex gap-2">
                <Input
                  id="api-url"
                  placeholder="http://localhost:8000/api"
                  defaultValue="http://localhost:8000/api"
                />
                <Button variant="outline">Test Connection</Button>
              </div>
              <p className="text-xs text-muted-foreground">
                The base URL of your Django REST API endpoints
              </p>
            </div>
            <Separator />
            <div className="space-y-2">
              <Label htmlFor="auth-token">Authentication Token</Label>
              <Input
                id="auth-token"
                type="password"
                placeholder="Enter your API token"
              />
              <p className="text-xs text-muted-foreground">
                Token obtained from Django Token Authentication
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Database Info */}
        <Card className="shadow-elegant">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                <Database className="h-5 w-5" />
              </div>
              <div>
                <CardTitle>Database Status</CardTitle>
                <CardDescription>
                  MySQL database connection status (managed by Django)
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
              <div className="space-y-1">
                <p className="font-medium">MySQL Database</p>
                <p className="text-sm text-muted-foreground">
                  Connection managed by Django backend
                </p>
              </div>
              <Badge variant="outline" className="bg-muted">
                <span className="mr-2 h-2 w-2 rounded-full bg-muted-foreground animate-pulse" />
                Awaiting Connection
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* API Endpoints Reference */}
        <Card className="shadow-elegant">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <Globe className="h-5 w-5" />
              </div>
              <div>
                <CardTitle>API Endpoints Reference</CardTitle>
                <CardDescription>
                  Required Django REST Framework endpoints
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 font-mono text-sm">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <span className="text-muted-foreground">Authentication</span>
                <code className="text-foreground">/api/auth/login/</code>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <span className="text-muted-foreground">Students CRUD</span>
                <code className="text-foreground">/api/students/</code>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <span className="text-muted-foreground">Courses CRUD</span>
                <code className="text-foreground">/api/courses/</code>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <span className="text-muted-foreground">Grades CRUD</span>
                <code className="text-foreground">/api/grades/</code>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <span className="text-muted-foreground">Attendance CRUD</span>
                <code className="text-foreground">/api/attendance/</code>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <span className="text-muted-foreground">Dashboard Stats</span>
                <code className="text-foreground">/api/dashboard/stats/</code>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="shadow-elegant">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success/10 text-success">
                <Bell className="h-5 w-5" />
              </div>
              <div>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>
                  Configure notification preferences
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-muted-foreground">Receive email alerts for important events</p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Browser Notifications</p>
                <p className="text-sm text-muted-foreground">Push notifications in your browser</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card className="shadow-elegant">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <CardTitle>Security</CardTitle>
                <CardDescription>
                  Security and session settings
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Remember Session</p>
                <p className="text-sm text-muted-foreground">Stay logged in for 30 days</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground">Extra layer of security for your account</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Settings;
