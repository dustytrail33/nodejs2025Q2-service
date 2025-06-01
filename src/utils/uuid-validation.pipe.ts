import {
  PipeTransform,
  Injectable,
  BadRequestException,
  ArgumentMetadata,
} from '@nestjs/common';
import { validate as isUuid } from 'uuid';

@Injectable()
export class UuidValidationPipe implements PipeTransform<string> {
  transform(value: string, metadata: ArgumentMetadata): string {
    if (!isUuid(value)) {
      throw new BadRequestException(`${metadata.data} must be a valid UUID`);
    }
    return value;
  }
}
