import React from 'react';
import { Post } from '../../data/posts';
import { HeartIcon, MessageCircleIcon, Share2Icon } from 'lucide-react';
interface PostCardProps {
  post: Post;
}
export const PostCard: React.FC<PostCardProps> = ({
  post
}) => {
  return <div className="card mb-8">
      <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex items-center">
        <img src={post.author.avatar} alt={post.author.name} className="h-10 w-10 rounded-full object-cover" />
        <div className="ml-3">
          <p className="font-medium text-gray-800 dark:text-white">
            {post.author.name}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {post.date}
          </p>
        </div>
      </div>
      <div className="relative">
        <img src={post.image} alt={post.title} className="w-full h-64 sm:h-80 object-cover" />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
          {post.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          {post.content}
        </p>
        <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="flex items-center text-gray-500 dark:text-gray-400 hover:text-secondary-500">
              <HeartIcon className="h-5 w-5 mr-1" />
              <span>{post.likes}</span>
            </button>
            <button className="flex items-center text-gray-500 dark:text-gray-400 hover:text-secondary-500">
              <MessageCircleIcon className="h-5 w-5 mr-1" />
              <span>{post.comments}</span>
            </button>
          </div>
          <button className="text-gray-500 dark:text-gray-400 hover:text-secondary-500">
            <Share2Icon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>;
};