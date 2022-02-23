import { FC } from "react";
import Carousel from "react-bootstrap/esm/Carousel";
import { Post } from "./interface";

interface Props {
  post: Post;
}

const PostCard: FC<Props> = ({ post }) => {
  return (
    <div className="row w-75 justify-content-center mb-4">
      <div className="col-8 rounded border p-3">
        <div className="d-flex gap-4 align-items-center mb-2">
          <img
            style={{ width: "50px", height: "50px" }}
            className="img-thumbnail rounded-circle"
            src={post.owner.avatarURL}
          />
          <div className="d-flex flex-column">
            <div>{post.owner.username}</div>
            <small className=" text-black-50">{post.createdAt}</small>
          </div>
        </div>
        {post.images.length > 0 && (
          <div className="overflow-hidden">
            <Carousel interval={null}>
              {post.images.map((image, index) => (
                <Carousel.Item>
                  <img
                    className=" img-fluid rounded"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "fill",
                    }}
                    key={index}
                    src={image}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        )}
        <div className="mt-2">
          <p>{post.body}</p>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
