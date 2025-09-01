import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const CustomPopover = ({
  trigger,
  children,
  className,
}: {
  trigger: React.ReactNode;
  children: React.ReactNode;
  className: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger className="cursor-pointer w-full">
        {trigger}
      </PopoverTrigger>
      <PopoverContent className={className}>{children}</PopoverContent>
    </Popover>
  );
};
export default CustomPopover;
