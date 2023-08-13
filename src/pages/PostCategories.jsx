import { PostRandom } from "../components/Catalogue/PostRandom";
import { Sidebar } from "../components/Header/Sidebar";

export const PostCategories = () =>{
    return (
            <>
            <Sidebar/>
            <section className="posts-randoms">
                <div className="posts-random-container">
                    <PostRandom/>
                </div>
            </section>
        </>
    )

}