import {
    BeforeInsert, Column, Entity, JoinTable, ManyToMany,
    OneToMany
} from 'typeorm';
import { Exclude, classToPlain } from 'class-transformer';
import { IsEmail } from 'class-validator';
import { AbstractEntity } from 'src/entities/abstract-entity';
import { CommentEntity } from 'src/entities/comment.entity';
import { PropertyEntity } from 'src/entities/property.entity';
import { UserResponse } from 'src/models/user.model';
import { hash, genSalt } from 'bcrypt';

@Entity('users')
export class UserEntity extends AbstractEntity {
    @Column()
    name: string;

    @Column({ unique: true })
    @IsEmail()
    email: string;

    @Column({ unique: true })
    username: string;

    @Column({ default: null, nullable: true })
    avatar: string | null;

    @Column({ default: true })
    isActive: boolean;

    @Column()
    @Exclude()
    salt: string;

    @Column()
    @Exclude()
    password: string;

    @OneToMany(
        type => PropertyEntity,
        property => property.user,
    )
    properties: PropertyEntity[];

    @OneToMany(
        type => CommentEntity,
        comment => comment.user,
    )
    comments: CommentEntity[];
    
    @ManyToMany(
        type => PropertyEntity,
        property => property.ratedBy,
    )
    ratings: PropertyEntity[];

    @BeforeInsert()
    async hashPassword() {
        this.salt = await genSalt();
        this.password = await hash(this.password, this.salt);
    }

    @BeforeInsert()
    emailToLowerCase() {
        this.email = this.email.toLowerCase();
    }

    async validatePassword(password: string): Promise<boolean> {
        const hashed = await hash(password, this.salt);
        return hashed === this.password;
    }

    toJSON(): UserResponse {
        return <UserResponse>classToPlain(this);
    }
}