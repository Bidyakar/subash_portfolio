import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IArticle extends Document {
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    category: string;
    imageUrl?: string;
    isFeatured: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const ArticleSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        content: { type: String, required: true },
        excerpt: { type: String, required: true },
        category: { type: String, required: true },
        imageUrl: { type: String },
        isFeatured: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
);

const Article: Model<IArticle> = mongoose.models.Article || mongoose.model<IArticle>('Article', ArticleSchema);

export default Article;
