import { Zap } from "lucide-react";
import { Link } from "react-router-dom";

export const AuthHeader = () => {
  return (
    <div className="fixed top-0 left-0 right-0 w-full p-6 flex justify-between items-center">
      <div className="flex items-center h-full gap-2 w-auto md:w-[16rem] px-4">
        <Link
          to="/login"
          className="text-foreground font-bold text-2xl flex items-center gap-1"
        >
          <Zap color="#2B7FFF" fill="#2B7FFF" className="h-6 w-6 text-primary" />
          UniPath
        </Link>
      </div>
    </div>
  );
};
