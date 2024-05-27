import { courses } from "./Courses";
import { period } from "./Periods";

export interface Students{
    id: number; 
    name: String; 
    age: number;
    courseId: courses,
    active: boolean, 
    period: period
}