import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { groupDto } from './group.dto';
import * as bcrypt from 'bcrypt';
import { group } from 'console';

@Injectable()
export class GroupService {
	constructor(private prisma : PrismaService) {}

	async creatGroup(id:string,{name,password,type}: groupDto) {
		// console.log(name,password,type)
		let hash : string = '';
		if (type === 'protected' && password.length < 4)
			throw new ForbiddenException('password length must be at least 4 charachters')
		else if (type === 'protected') {
			hash =  await bcrypt.hash(password,10);
		}

		try {
			const group = await this.prisma.group.create({
				data: {
					name:name,
					type:type,
					password: hash,
					owner: {
						connect: {
							id:id
						}
					},
					user:{
						connect:{
							id:id,
						}
					}
				},
				select: {
					id:true,
					name:true,
					type:true,
					owner:{
						select:{
							id:true,
							userName:true,
						}
					}
				}
			})
			return group
		}catch(e) {
			throw new ForbiddenException(e)
		}
	}

	async getMyGroups(id:string) {
		try{
			const user = await this.prisma.user.findUnique({
				where: {
					id: id
				},
				select: {
					groups: {
						select: {
							id:true,
							name:true,
							type:true,
						},
						orderBy:{
							updatedAt: 'desc'
						}
					}
				}
		})
		return user.groups
		}
		catch {
			throw new UnauthorizedException()
		}
	}

	async getGroup(userId: string,groupId: string) {
		try{
			if (!groupId)
				return null
			const user = await this.prisma.user.findUniqueOrThrow({
				where:{
					id:userId
				},
				select: {
					groups:{
						where:{
							id:groupId
						},
						select:{
							id:true,
							name:true,
							messages:{
								include:{
									sender:true
								}
							},
							type:true,
							owner: {
								select:{
									id:true,
									userName:true,
								}
							},
							admins: {
								select:{
									id:true,
									userName:true,
								}
							},
							members:{
								select:{
									id:true,
									userName:true,
								}
							}
						}
					}
				}	
			})
			user.groups[0].messages.reverse()
			return user.groups[0];
		}catch {
			throw new UnauthorizedException()
		}
			
	}

	async sendMessage(id:string,message: string, groupId : string) {
		if (message.length === 0)
			throw new UnauthorizedException()
			try {
				
				const user = await this.prisma.user.findUnique({
					where:{
						id:id,
					},
					select:{
						groups:true
					}
				})
				
				const group = user.groups.filter(group => group.id === groupId)
				if (!group)
					throw new UnauthorizedException('your are unauthorized to send a message in this group')
					const msg = await this.prisma.message.create({
						data : {
							content: message,
							sender: {
								connect: {
									id: id
								}
							},
							group: {
								connect: {
									id: groupId
								}
							},
						},
						include:{
							sender:true
						}
					});
			await this.prisma.group.update({
				where: {
					id:groupId
				},
				data: {
					id:groupId
				}
			})
			return msg;
		}
		catch (e) {
			throw new UnauthorizedException('You can\'t send message in this group.')
		}
	}

	async deleteGroup(ownerId: string,groupId: string) {
		try{

			const group = await this.prisma.group.findUniqueOrThrow({
				where: {
					id : groupId
				},
				select: {
					owner:true
				}
			})
			if (group.owner.id !== ownerId)
				throw new UnauthorizedException('')
			await this.prisma.group.delete({
				where:{
					id: groupId
				}
			})

			return 'deleted';

		}
		catch(e){
			if (e.code === 'P2025')
				throw new NotFoundException('group not found')	
			throw new UnauthorizedException()
		}
	}


	async searchForGroups(userid:string) {
		const groups = await this.prisma.group.findMany({
			where: {
				NOT: {
					user:{
						some:{
							id:userid
						}
					},
				},
				'AND': {
					'NOT' :{

						type: 'private'
					}
				}
				
			},
			select:{
				id:true,
				name: true,
				type:true,
			}
		});
		return groups
	}
	async joinGroup(userId: string,groupId: string,password:string) {
		const group = await this.prisma.group.findUniqueOrThrow({
			where: {
				id:groupId
			},
			select:{
				id:true,
				name:true,
				type:true,
				password:true,
				user:true
			}
		})
		if (group.type === 'protected' && !bcrypt.compareSync(password,group.password))
			throw new UnauthorizedException('group password incorrect')
		else if (group.type === 'private')
			throw new UnauthorizedException('this group is private')
		group.user.map(user => {
			if(user.id === userId) 
				 throw new UnauthorizedException('this user already this in group')
		})	
		try{

			const user = await this.prisma.user.update({
				where: {
					id:userId,
				},
				'data' :{
					groups: {
						connect:{
							id:groupId,
						}
					},
					groupmember:{
						connect:{
							id:groupId
						}
					}
					
				}
			})
			delete group.password
			return group	
		}
		catch{
			throw new UnauthorizedException()
		}
	}
}
