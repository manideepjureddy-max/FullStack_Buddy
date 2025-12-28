import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { StudentTable } from '@/components/students/StudentTable';
import { StudentFormDialog } from '@/components/students/StudentFormDialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Search, Filter } from 'lucide-react';
import { mockStudents } from '@/data/mockData';
import { Student } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

const Students = () => {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const { toast } = useToast();

  const filteredStudents = students.filter((student) => {
    const matchesSearch = 
      student.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.student_id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || student.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleAddStudent = (data: Omit<Student, 'id'>) => {
    const newStudent: Student = {
      ...data,
      id: Math.max(...students.map(s => s.id)) + 1,
    };
    setStudents([...students, newStudent]);
    toast({
      title: 'Student Added',
      description: `${data.first_name} ${data.last_name} has been added successfully.`,
    });
  };

  const handleEditStudent = (data: Omit<Student, 'id'>) => {
    if (!editingStudent) return;
    setStudents(students.map(s => 
      s.id === editingStudent.id ? { ...data, id: editingStudent.id } : s
    ));
    setEditingStudent(null);
    toast({
      title: 'Student Updated',
      description: `${data.first_name} ${data.last_name} has been updated.`,
    });
  };

  const handleDeleteStudent = (student: Student) => {
    setStudents(students.filter(s => s.id !== student.id));
    toast({
      title: 'Student Deleted',
      description: `${student.first_name} ${student.last_name} has been removed.`,
      variant: 'destructive',
    });
  };

  const handleViewStudent = (student: Student) => {
    toast({
      title: 'View Student',
      description: `Viewing details for ${student.first_name} ${student.last_name}`,
    });
  };

  return (
    <MainLayout title="Students" subtitle="Manage student records and information">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search students..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-3">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="graduated">Graduated</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => setIsFormOpen(true)} className="bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            Add Student
          </Button>
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground mb-4">
        Showing {filteredStudents.length} of {students.length} students
      </p>

      {/* Table */}
      <StudentTable
        students={filteredStudents}
        onEdit={(student) => {
          setEditingStudent(student);
          setIsFormOpen(true);
        }}
        onDelete={handleDeleteStudent}
        onView={handleViewStudent}
      />

      {/* Form Dialog */}
      <StudentFormDialog
        open={isFormOpen}
        onOpenChange={(open) => {
          setIsFormOpen(open);
          if (!open) setEditingStudent(null);
        }}
        student={editingStudent}
        onSubmit={editingStudent ? handleEditStudent : handleAddStudent}
      />
    </MainLayout>
  );
};

export default Students;
