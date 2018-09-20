import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'padNumber'
})
export class PadNumberPipe implements PipeTransform {
  transform(value: number, pad: string): string {
    if (value == null)
        return null;
    return (pad.toString() + value).substring(value.toString().length);
  }
}
