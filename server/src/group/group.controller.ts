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
		console.log(grpData)
		return this.groupService.creatGroup(req['user'].sub, grpData);
	}

	@Get('getmygroups')
	getMyGroup(@Req() req : Request){
		return this.groupService.getMyGroups(req['user'].sub);
	}

	@Get('get')
	getGroup(@Req() req: Request,@Query('id') groupId: string){
		return this.groupService.getGroup(req['user'].sub, groupId)
	}
	@Post('join')
	joinGroup(@Req() req: Request,@Query('id') groupId: string,@Body('password') password: string) {
		return this.groupService.joinGroup(req['user'].sub,groupId,password);
	}
	@Post('send')
	sendMessage(@Req() req: Request,@Query('id') id: string, @Body('message') message: string) {
		return this.groupService.sendMessage(req['user'].sub, message, id);
	}
	@Get('search')
	searchForGroups(@Req() req: Request) {
		return this.groupService.searchForGroups(req['user'].sub);
	}
	@Delete('delete')
	deleteGroup(@Req() req: Request,@Query('id') groupId: string) {
		return this.groupService.deleteGroup(req['user'].sub,groupId);
	}
}

