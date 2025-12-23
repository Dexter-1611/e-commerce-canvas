import { motion } from 'framer-motion';
import { categories } from '@/data/products';

export const CategoryBar = () => {
  return (
    <div className="bg-card border-b py-4 overflow-x-auto custom-scrollbar">
      <div className="container mx-auto">
        <div className="flex items-center justify-between gap-4 min-w-max px-4">
          {categories.map((category, index) => (
            <motion.a
              key={category.id}
              href="#"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              className="flex flex-col items-center gap-2 group min-w-[80px]"
            >
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-2xl group-hover:bg-accent group-hover:shadow-md transition-all">
                {category.icon}
              </div>
              <span className="text-xs font-medium text-center text-muted-foreground group-hover:text-foreground transition-colors">
                {category.name}
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
};
