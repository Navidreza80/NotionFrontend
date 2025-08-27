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
  return (
    <Popover>
      <PopoverTrigger className="cursor-pointer">{trigger}</PopoverTrigger>
      <PopoverContent className={className}>{children}</PopoverContent>
    </Popover>
  );
};
export default CustomPopover;
