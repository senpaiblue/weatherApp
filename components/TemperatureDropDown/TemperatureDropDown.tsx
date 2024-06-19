"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGlobalContext } from "@/context/globalContext";

export function TemperatureDropDown() {
  const { isCelsius, toggleTemperatureUnit } = useGlobalContext();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <span className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0">
            {isCelsius ? "C°" : "F°"}
          </span>
          <span className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100">
            {isCelsius ? "F°" : "C°"}
          </span>
          <span className="sr-only">Toggle temperature unit</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={toggleTemperatureUnit}>
          {isCelsius ? "Switch to Fahrenheit" : "Switch to Celsius"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
