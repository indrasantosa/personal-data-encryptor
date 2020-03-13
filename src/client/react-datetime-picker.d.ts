declare module 'react-datetime-picker' {
  interface DateTimePickerInterface {
    onChange: any;
    value: any;
    calendarIcon: any;
    clearIcon: any;
    locale: any;
    minDate: any;
  }

  export default class DateTimePicker extends React.Component<
    DateTimePickerInterface
  > {}
}
