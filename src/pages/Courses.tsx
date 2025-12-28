import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Plus, Search, Users, Clock, BookOpen } from 'lucide-react';
import { mockCourses } from '@/data/mockData';
import { cn } from '@/lib/utils';

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = mockCourses.filter((course) =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout title="Courses" subtitle="Manage courses and curriculum">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Add Course
        </Button>
      </div>

      {/* Course Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.map((course, index) => {
          const capacityPercent = (course.enrolled_count / course.max_capacity) * 100;
          const isNearCapacity = capacityPercent >= 90;

          return (
            <Card 
              key={course.id} 
              className="shadow-elegant hover:shadow-lg transition-all duration-300 animate-fade-in cursor-pointer group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <Badge variant="outline" className="mb-2 bg-primary/5 text-primary border-primary/20">
                      {course.code}
                    </Badge>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {course.name}
                    </CardTitle>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                    <BookOpen className="h-5 w-5" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {course.description}
                </p>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Instructor:</span>
                    <span className="font-medium">{course.instructor}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{course.schedule}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Enrollment</span>
                    <span className={cn(
                      'font-medium',
                      isNearCapacity ? 'text-accent' : 'text-foreground'
                    )}>
                      {course.enrolled_count}/{course.max_capacity}
                    </span>
                  </div>
                  <Progress 
                    value={capacityPercent} 
                    className={cn(
                      'h-2',
                      isNearCapacity && '[&>div]:bg-accent'
                    )}
                  />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <Badge variant="secondary" className="bg-muted">
                    {course.department}
                  </Badge>
                  <Badge variant="outline" className="bg-secondary/5 text-secondary border-secondary/20">
                    {course.credits} Credits
                  </Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </MainLayout>
  );
};

export default Courses;
