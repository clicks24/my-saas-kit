import { DayPicker } from "react-day-picker";

export type DateTimePickerProps = {
    value: Date;
    onChange: (value: Date) => void;
};

function DateTimePicker({ value, onChange }: DateTimePickerProps) {
    return (
        <div>
            <DayPicker
                selected={value}
                onDayClick={onChange}
                showOutsideDays={true}
            />
            {/* Add time selection controls here */}
        </div>
    );
}

export { DateTimePicker };

