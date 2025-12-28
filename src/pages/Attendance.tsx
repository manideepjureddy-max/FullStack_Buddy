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
import { Search, Plus, Calendar, CheckCircle2, XCircle, Clock, AlertCircle } from 'lucide-react';
import { mockAttendance } from '@/data/mockData';
import { cn } from '@/lib/utils';

const statusConfig = {
  present: {
    label: 'Present',
    icon: CheckCircle2,
    className: 'bg-success/10 text-success border-success/20',
  },
  absent: {
    label: 'Absent',
    icon: XCircle,
    className: 'bg-destructive/10 text-destructive border-destructive/20',
  },
  late: {
    label: 'Late',
    icon: Clock,
    className: 'bg-accent/10 text-accent border-accent/20',
  },
  excused: {
    label: 'Excused',
    icon: AlertCircle,
    className: 'bg-muted text-muted-foreground border-muted',
  },
};

const Attendance = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState('');

  const filteredAttendance = mockAttendance.filter((record) => {
    const matchesSearch =
      record.student_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.course_name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
    const matchesDate = !dateFilter || record.date === dateFilter;
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  // Calculate stats
  const stats = {
    total: filteredAttendance.length,
    present: filteredAttendance.filter(r => r.status === 'present').length,
    absent: filteredAttendance.filter(r => r.status === 'absent').length,
    late: filteredAttendance.filter(r => r.status === 'late').length,
  };

  const attendanceRate = stats.total > 0 
    ? ((stats.present / stats.total) * 100).toFixed(1) 
    : '0';

  return (
    <MainLayout title="Attendance" subtitle="Track and manage attendance records">
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
        <div className="flex gap-3 flex-wrap">
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="pl-9 w-40"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="present">Present</SelectItem>
              <SelectItem value="absent">Absent</SelectItem>
              <SelectItem value="late">Late</SelectItem>
              <SelectItem value="excused">Excused</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            Record Attendance
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Total Records</p>
          <p className="text-2xl font-bold">{stats.total}</p>
        </div>
        <div className="rounded-xl border border-success/20 bg-success/5 p-4">
          <p className="text-sm text-success">Present</p>
          <p className="text-2xl font-bold text-success">{stats.present}</p>
        </div>
        <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4">
          <p className="text-sm text-destructive">Absent</p>
          <p className="text-2xl font-bold text-destructive">{stats.absent}</p>
        </div>
        <div className="rounded-xl border border-accent/20 bg-accent/5 p-4">
          <p className="text-sm text-accent">Late</p>
          <p className="text-2xl font-bold text-accent">{stats.late}</p>
        </div>
        <div className="rounded-xl gradient-secondary p-4">
          <p className="text-sm text-secondary-foreground/80">Attendance Rate</p>
          <p className="text-2xl font-bold text-secondary-foreground">{attendanceRate}%</p>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border bg-card shadow-elegant overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="font-semibold">Student</TableHead>
              <TableHead className="font-semibold">Course</TableHead>
              <TableHead className="font-semibold">Date</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAttendance.map((record, index) => {
              const config = statusConfig[record.status];
              const StatusIcon = config.icon;

              return (
                <TableRow 
                  key={record.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <TableCell className="font-medium">{record.student_name}</TableCell>
                  <TableCell>{record.course_name}</TableCell>
                  <TableCell className="font-mono text-sm">
                    {new Date(record.date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={cn('gap-1', config.className)}
                    >
                      <StatusIcon className="h-3 w-3" />
                      {config.label}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </MainLayout>
  );
};

export default Attendance;
