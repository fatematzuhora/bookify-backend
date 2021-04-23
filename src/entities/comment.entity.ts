import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstractEntity } from 'src/entities/abstract-entity';
import { UserEntity } from 'src/entities/user.entity';
import { PropertyEntity } from 'src/entities/property.entity';

@Entity('comments')
export class CommentEntity extends AbstractEntity {
    @Column()
    body: string;

    @ManyToOne(
        type => UserEntity,
        user => user.comments,
        { eager: true },
    )
    user: UserEntity;

    @ManyToOne(
        type => PropertyEntity,
        property => property.comments,
    )
    property: PropertyEntity;

}