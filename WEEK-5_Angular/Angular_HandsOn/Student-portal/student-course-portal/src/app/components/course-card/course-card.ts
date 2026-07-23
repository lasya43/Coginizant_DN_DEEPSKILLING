import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditLabelPipe } from '../../pipes/credit-label-pipe';
import { Course } from '../../models/course.model';
import { EnrollmentService } from '../../services/enrollment';

@Component({
  selector: 'app-course-card',
  imports: [CommonModule, CreditLabelPipe],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css',
})
export class CourseCard implements OnChanges, OnInit {
  @Input() course!: Course;
  
  isExpanded = false;
  isEnrolled = false;

  constructor(private enrollmentService: EnrollmentService) {}

  ngOnInit() {
    this.checkEnrollmentStatus();
  }

  get cardClasses() {
    return {
      'card--enrolled': this.isEnrolled,
      'card--full': this.course?.credits >= 4,
      'expanded': this.isExpanded
    };
  }

  get borderStyle() {
    if (this.course?.gradeStatus === 'passed') return '5px solid green';
    if (this.course?.gradeStatus === 'failed') return '5px solid red';
    if (this.course?.gradeStatus === 'pending') return '5px solid grey';
    return '5px solid #0056b3';
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['course']) {
      console.log('Course changed:', changes['course'].previousValue, '->', changes['course'].currentValue);
      this.checkEnrollmentStatus();
    }
  }

  checkEnrollmentStatus() {
    if (this.course) {
      this.isEnrolled = this.enrollmentService.isEnrolled(this.course.id);
    }
  }

  toggleEnrollment() {
    if (this.isEnrolled) {
      this.enrollmentService.unenroll(this.course.id);
    } else {
      this.enrollmentService.enroll(this.course.id);
    }
    this.checkEnrollmentStatus();
  }
}
