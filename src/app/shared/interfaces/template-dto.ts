import { ITemplateChannelDto } from './template-channel-dto';

export interface ITemplateDto {
  templateName: string;
  entityTypeName: string;
  modelName: string;
  modelVersion: number | null;
  templateChannels: ITemplateChannelDto[];
}
