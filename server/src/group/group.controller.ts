import { Body, Controller, Delete, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';
import { GroupService } from './group.service';
import { groupDto } from './group.dto';


@UseGuards(AuthGuard)
@Controller('group')
export class GroupController {

	constructor(private groupService: GroupService) {}

	@Post('create') 
	createGroup(@Req() req: Request,@Body() grpData: groupDto) {
		return this.groupService.creatGroup(req['userAuth'].id, grpData);
	}

	@Get('getmygroups')
	getMyGroup(@Req() req : Request){
		return this.groupService.getMyGroups(req['userAuth'].id);
	}

	@Get('get')
	getGroup(@Req() req: Request,@Query('id') groupId: string){
		return this.groupService.getGroup(req['userAuth'].id, groupId)
	}

	@Post('send')
	sendMessage(@Req() req: Request,@Query('id') id: string, @Body('message') message: string) {
		return this.groupService.sendMessage(req['userAuth'].id, message, id);
	}
	@Get('search')
	searchForGroups(@Req() req: Request) {
		return this.groupService.searchForGroups(req['userAuth'].id);
	}
	@Delete('delete')
	deleteGroup(@Req() req: Request,@Query('id') groupId: string) {
		return this.groupService.deleteGroup(req['userAuth'].id,groupId);
	}
}

