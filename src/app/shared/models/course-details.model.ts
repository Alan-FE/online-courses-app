export class CourseDetailsModel {
    instrFullName: string;
    courseId: number; 
    courseName: string; 
    description: string; 
    language: string; 
    image: string; 
    price: number; 
    added: string; 
    content: string[];
    courseRating: number;
    fkUser?: number;
    cartId?: number;
    inCart?: number;
    purchased?: number;
    noRating?: number;
}