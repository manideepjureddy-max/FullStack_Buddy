import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Plus, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { mockGrades } from '@/data/mockData';
import { cn } from '@/lib/utils';

const gradeColors: Record<string, string> = {
  'A+': 'bg-success/10 text-success border-success/20',
  'A': 'bg-success/10 text-success border-success/20',
  'A-': 'bg-success/10 text-success border-success/20',
  'B+': 'bg-secondary/10 text-secondary border-secondary/20',
  'B': 'bg-secondary/10 text-secondary border-secondary/20',
  'B-': 'bg-secondary/10 text-secondary border-secondary/20',
  'C+': 'bg-accent/10 text-accent border-accent/20',
  'C': 'bg-accent/10 text-accent border-accent/20',
  'C-': 'bg-accent/10 text-accent border-accent/20',
  'D': 'bg-destructive/10 text-destructive border-destructive/20',
  'F': 'bg-destructive/10 text-destructive border-destructive/20',
};

const Grades = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [semesterFilter, setSemesterFilter] = useState<string>('all');

  const filteredGrades = mockGrades.filter((grade) => {
    const matchesSearch =
      grade.student_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      grade.course_name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSemester = semesterFilter === 'all' || grade.semester.toLowerCase() === semesterFilter;
    
    return matchesSearch && matchesSemester;
  });

  const getScoreIcon = (score: number) => {
    if (score >= 90) return <TrendingUp className="h-4 w-4 text-success" />;
    if (score >= 70) return <Minus className="h-4 w-4 text-muted-foreground" />;
    return <TrendingDown className="h-4 w-4 text-destructive" />;
  };

  return (
    <MainLayout title="Grades" subtitle="View and manage student grades">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by student or course..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-3">
          <Select value={semesterFilter} onValueChange={setSemesterFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Semester" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Semesters</SelectItem>
              <SelectItem value="fall">Fall</SelectItem>
              <SelectItem value="spring">Spring</SelectItem>
              <SelectItem value="summer">Summer</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            Add Grade
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Total Records</p>
          <p className="text-2xl font-bold">{filteredGrades.length}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Average Score</p>
          <p className="text-2xl font-bold">
            {(filteredGrades.reduce((acc, g) => acc + g.score, 0) / filteredGrades.length || 0).toFixed(1)}%
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Highest Score</p>
          <p className="text-2xl font-bold text-success">
            {Math.max(...filteredGrades.map(g => g.score), 0)}%
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Lowest Score</p>
          <p className="text-2xl font-bold text-destructive">
            {Math.min(...filteredGrades.map(g => g.score), 0)}%
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border bg-card shadow-elegant overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="font-semibold">Student</TableHead>
              <TableHead className="font-semibold">Course</TableHead>
              <TableHead className="font-semibold">Semester</TableHead>
              <TableHead className="font-semibold">Score</TableHead>
              <TableHead className="font-semibold">Grade</TableHead>
              <TableHead className="font-semibold">Trend</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredGrades.map((grade, index) => (
              <TableRow 
                key={grade.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <TableCell className="font-medium">{grade.student_name}</TableCell>
                <TableCell>{grade.course_name}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-muted">
                    {grade.semester} {grade.year}
                  </Badge>
                </TableCell>
                <TableCell className="font-mono">{grade.score}%</TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className={cn('font-bold', gradeColors[grade.grade] || 'bg-muted')}
                  >
                    {grade.grade}
                  </Badge>
                </TableCell>
                <TableCell>{getScoreIcon(grade.score)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </MainLayout>
  );
};

export default Grades;
