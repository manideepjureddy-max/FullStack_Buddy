/**
 * API Service Layer for Django Backend Integration
 * 
 * Replace BASE_URL with your Django backend URL when ready.
 * All endpoints follow RESTful conventions compatible with Django REST Framework.
 */

const BASE_URL = 'http://localhost:8000/api'; // Replace with your Django URL

// Types
export interface Student {
  id: number;
  student_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  enrollment_date: string;
  department: string;
  status: 'active' | 'inactive' | 'graduated' | 'suspended';
  avatar?: string;
}

export interface Course {
  id: number;
  code: string;
  name: string;
  description: string;
  credits: number;
  department: string;
  instructor: string;
  schedule: string;
  enrolled_count: number;
  max_capacity: number;
}

export interface Grade {
  id: number;
  student_id: number;
  course_id: number;
  student_name: string;
  course_name: string;
  grade: string;
  score: number;
  semester: string;
  year: number;
}

export interface Attendance {
  id: number;
  student_id: number;
  course_id: number;
  student_name: string;
  course_name: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    username: string;
    email: string;
    role: string;
  };
}

// Helper function for API calls
async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem('auth_token');
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Token ${token}` }), // Django Token Auth
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }

  return response.json();
}

// Auth API
export const authApi = {
  login: (credentials: LoginCredentials) =>
    apiCall<AuthResponse>('/auth/login/', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  logout: () =>
    apiCall<void>('/auth/logout/', { method: 'POST' }),

  getCurrentUser: () =>
    apiCall<AuthResponse['user']>('/auth/user/'),
};

// Students API - CRUD Operations
export const studentsApi = {
  getAll: () => apiCall<Student[]>('/students/'),

  getById: (id: number) => apiCall<Student>(`/students/${id}/`),

  create: (student: Omit<Student, 'id'>) =>
    apiCall<Student>('/students/', {
      method: 'POST',
      body: JSON.stringify(student),
    }),

  update: (id: number, student: Partial<Student>) =>
    apiCall<Student>(`/students/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify(student),
    }),

  delete: (id: number) =>
    apiCall<void>(`/students/${id}/`, { method: 'DELETE' }),

  search: (query: string) =>
    apiCall<Student[]>(`/students/?search=${encodeURIComponent(query)}`),
};

// Courses API
export const coursesApi = {
  getAll: () => apiCall<Course[]>('/courses/'),

  getById: (id: number) => apiCall<Course>(`/courses/${id}/`),

  create: (course: Omit<Course, 'id'>) =>
    apiCall<Course>('/courses/', {
      method: 'POST',
      body: JSON.stringify(course),
    }),

  update: (id: number, course: Partial<Course>) =>
    apiCall<Course>(`/courses/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify(course),
    }),

  delete: (id: number) =>
    apiCall<void>(`/courses/${id}/`, { method: 'DELETE' }),
};

// Grades API
export const gradesApi = {
  getAll: () => apiCall<Grade[]>('/grades/'),

  getByStudent: (studentId: number) =>
    apiCall<Grade[]>(`/grades/?student_id=${studentId}`),

  getByCourse: (courseId: number) =>
    apiCall<Grade[]>(`/grades/?course_id=${courseId}`),

  create: (grade: Omit<Grade, 'id' | 'student_name' | 'course_name'>) =>
    apiCall<Grade>('/grades/', {
      method: 'POST',
      body: JSON.stringify(grade),
    }),

  update: (id: number, grade: Partial<Grade>) =>
    apiCall<Grade>(`/grades/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify(grade),
    }),

  delete: (id: number) =>
    apiCall<void>(`/grades/${id}/`, { method: 'DELETE' }),
};

// Attendance API
export const attendanceApi = {
  getAll: () => apiCall<Attendance[]>('/attendance/'),

  getByStudent: (studentId: number) =>
    apiCall<Attendance[]>(`/attendance/?student_id=${studentId}`),

  getByCourse: (courseId: number) =>
    apiCall<Attendance[]>(`/attendance/?course_id=${courseId}`),

  getByDate: (date: string) =>
    apiCall<Attendance[]>(`/attendance/?date=${date}`),

  create: (attendance: Omit<Attendance, 'id' | 'student_name' | 'course_name'>) =>
    apiCall<Attendance>('/attendance/', {
      method: 'POST',
      body: JSON.stringify(attendance),
    }),

  update: (id: number, attendance: Partial<Attendance>) =>
    apiCall<Attendance>(`/attendance/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify(attendance),
    }),

  bulkCreate: (records: Omit<Attendance, 'id' | 'student_name' | 'course_name'>[]) =>
    apiCall<Attendance[]>('/attendance/bulk/', {
      method: 'POST',
      body: JSON.stringify(records),
    }),
};

// Dashboard Stats API
export interface DashboardStats {
  total_students: number;
  total_courses: number;
  average_attendance: number;
  average_grade: number;
  recent_enrollments: number;
  department_breakdown: { department: string; count: number }[];
}

export const dashboardApi = {
  getStats: () => apiCall<DashboardStats>('/dashboard/stats/'),
};
