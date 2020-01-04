import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Repository, getManager } from "typeorm";
import Thread from "./thread.entity";
import { PageType, ISocialPage } from "../types";
import { FacebookPage } from "./facebook";
@Entity()
export default class Page {
   @PrimaryGeneratedColumn("uuid")
   id: string;

   @ManyToOne(
      () => Thread,
      thread => thread.posts,
      { onDelete: "CASCADE" }
   )
   @JoinColumn()
   thread: Thread;

   @Column("enum", { enum: PageType, name: "page_type" })
   type: string;

   @Column("uuid")
   pageId: string;

   async toSocial(): Promise<ISocialPage> {
      const page: Page = this;
      if (page.type === PageType.FacebookPage) {
         const facebookPageRepository: Repository<FacebookPage> = getManager().getRepository(FacebookPage);
         const facebookPage = await facebookPageRepository.findOne(page.pageId);
         if (!facebookPage) {
            console.log("PAGE IS NULL I NEED LOGGER");
         } else {
            return facebookPage;
         }
      } else if (page.type === PageType.InstagramPage) {
         console.log("no handler for instagram page");
      } else if (page.type === PageType.TwitterPage) {
         console.log("no handler for instagram page");
      }
   }
}