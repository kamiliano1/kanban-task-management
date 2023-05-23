import React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { CheckIcon, DividerHorizontalIcon } from "@radix-ui/react-icons";

export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

type DropMenuType = {
  name: string;
  children: any;
  props: any;
};

// eslint-disable-next-line react/display-name
export const DropdownMenuContent = React.forwardRef<any, any>(
  ({ children, ...props }, forwardedRef) => {
    return (
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content {...props} ref={forwardedRef}>
          {children}
          <DropdownMenuPrimitive.Arrow />
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    );
  }
);
