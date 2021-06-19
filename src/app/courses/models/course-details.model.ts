//import { ContentModel } from './review-model';
import { ReviewModel } from './review-model';

export class CourseDetailsModel {
    instrFullName: string; 
    courseId: number;
    courseName: string; 
    description: string; 
    language: string; 
    image: string; 
    price: number;
    added: string;
    content: string;
    inCart: number;
    purchased: number;
    courseRating: number;
    reviews: ReviewModel[];
}