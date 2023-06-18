import { DeveloperLevelEnum } from '@medusa-issues/developer/enum/developer-level.enum';
import { DeveloperRolEnum } from '@medusa-issues/developer/enum/developer-rol.enum';

export class Developer {
    constructor(private readonly name: string, private readonly level: DeveloperLevelEnum, private readonly rol : DeveloperRolEnum, private readonly skills: string[]) {}
}
