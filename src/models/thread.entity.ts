import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { MinLength, MaxLength, IsString } from "class-validator";
import User from "./user.entity";
import Post from "./post.entity";
import Legend from "./legend.entity";
import Page from "./page.entity";
import FacebookPage from "./facebook/facebookPage.entity";
@Entity()
export default class Thread {
   @PrimaryGeneratedColumn("uuid")
   id: string;

   @Column()
   @IsString()
   @MinLength(6, { message: "Thread name is too short, min size is 6 symbols" })
   @MaxLength(30, { message: "Thread name is too long, max size is 30 symbols" })
   name: string;

   @ManyToOne(
      () => User,
      user => user.thread,
      { onDelete: "CASCADE" },
   )
   @JoinColumn()
   user: User;

   //#region pages
   @OneToMany(
      () => Page,
      page => page.thread,
      { onDelete: "CASCADE" },
   )
   page: Page[];

   @OneToMany(
      () => FacebookPage,
      page => page.thread,
      { onDelete: "CASCADE" },
   )
   facebookPage: FacebookPage[];
   //#endregion pages
   @OneToMany(
      () => Post,
      post => post.thread,
      { onDelete: "CASCADE" },
   )
   posts: Post[];
   @OneToMany(
      () => Legend,
      history => history.thread,
      { onDelete: "CASCADE" },
   )
   hisotry: Legend;
}
