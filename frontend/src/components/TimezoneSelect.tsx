
import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "./ui/utils"
import { Button } from "./ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover"
import { TIMEZONES } from "../utils/datetime"

type Timezone = typeof TIMEZONES[number]


interface TimezoneSelectProps {
  value: string
  onChange: (value: string) => void
  className?: string
}

export function TimezoneSelect({ value, onChange, className }: TimezoneSelectProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between font-normal", !value && "text-muted-foreground", className)}
        >
          {value
            ? TIMEZONES.find((timeZone) => timeZone.value === value)?.label + 
              ` (${TIMEZONES.find((timeZone) => timeZone.value === value)?.offset})`
            : "Select timezone..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0" side="bottom" align="start">
        <Command>
          <CommandInput placeholder="Search timezone..." />
          <CommandList>
            <CommandEmpty>No timezone found.</CommandEmpty>
            <CommandGroup>
              {TIMEZONES.map((timeZone) => (
                <CommandItem
                  key={timeZone.value}
                  value={`${timeZone.label} ${timeZone.keywords}`}
                  onSelect={() => {
                    onChange(timeZone.value)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === timeZone.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {timeZone.label} ({timeZone.offset})
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
