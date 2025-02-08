import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  courseYear: {
    type: String,
    required: true,
  },
  totalLessons: {
    type: Number,
    required: true,
  },
});

export default mongoose.models.Course || mongoose.model('Course', CourseSchema);