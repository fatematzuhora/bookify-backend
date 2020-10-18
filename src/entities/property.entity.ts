import {
    BeforeInsert, Column, Entity, JoinTable, ManyToOne, ManyToMany,
    OneToMany, RelationCount
} from 'typeorm';
import { classToPlain } from 'class-transformer';
import * as slugify from 'slug';
import { AbstractEntity } from 'src/entities/abstract-entity';
import { UserEntity } from 'src/entities/user.entity';
import { CommentEntity } from 'src/entities/comment.entity';
import { PropertyType, PropertyResponse } from 'src/models/property.model';
  
@Entity('properties')
export class PropertyEntity extends AbstractEntity {
    @Column()
    slug: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @Column({ type: 'enum', enum: PropertyType })
    type: PropertyType;

    @Column({ nullable: false })
    country: string;

    @Column({ nullable: false })
    city: string;

    @Column({ default: null, nullable: true })
    image: string | null;

    @ManyToMany(
        type => UserEntity,
        user => user.ratings,
        { eager: true },
    )
    @JoinTable()
    ratedBy: UserEntity[];

    @RelationCount((property: PropertyEntity) => property.ratedBy)
    ratingsCount: number;

    @OneToMany(
        type => CommentEntity,
        comment => comment.property,
    )
    comments: CommentEntity[];

    @ManyToOne(
        type => UserEntity,
        user => user.properties,
        { eager: true },
    )
    user: UserEntity;

    @BeforeInsert()
    generateSlug() {
        this.slug =
        slugify(this.title, { lower: true }) +
        '-' +
        ((Math.random() * Math.pow(36, 6)) | 0).toString(36);
    }

    toJSON() {
        return classToPlain(this);
    }

    toProperty(user?: UserEntity): PropertyResponse {
        let ratedBy = null;
        if (user) {
            ratedBy = this.ratedBy.map(user => user.id).includes(user.id);
        }
        const property: any = this.toJSON();
        delete property.ratedBy;
        return { ...property, ratedBy };
    }
}