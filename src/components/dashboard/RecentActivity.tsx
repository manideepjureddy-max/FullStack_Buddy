import { UserPlus, BookOpen, Award, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const activities = [
  {
    id: 1,
    type: 'enrollment',
    message: 'Emma Johnson enrolled in CS301',
    time: '2 hours ago',
    icon: UserPlus,
    iconBg: 'bg-secondary/10 text-secondary',
  },
  {
    id: 2,
    type: 'course',
    message: 'New course "Machine Learning" added',
    time: '4 hours ago',
    icon: BookOpen,
    iconBg: 'bg-primary/10 text-primary',
  },
  {
    id: 3,
    type: 'grade',
    message: 'Grades posted for MATH201',
    time: '6 hours ago',
    icon: Award,
    iconBg: 'bg-accent/10 text-accent',
  },
  {
    id: 4,
    type: 'attendance',
    message: 'Attendance recorded for PHYS101',
    time: '8 hours ago',
    icon: Clock,
    iconBg: 'bg-success/10 text-success',
  },
];

export function RecentActivity() {
  return (
    <Card className="shadow-elegant">
      <CardHeader>
        <CardTitle className="text-lg">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border">
          {activities.map((activity, index) => (
            <div
              key={activity.id}
              className="flex items-center gap-4 p-4 transition-colors hover:bg-muted/50 animate-slide-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={cn('rounded-lg p-2', activity.iconBg)}>
                <activity.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {activity.message}
                </p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
