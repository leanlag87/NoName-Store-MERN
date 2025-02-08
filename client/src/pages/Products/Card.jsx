import React, { useState } from "react";
import * as MyCardStyles from "./Styles/MyCardStyles";

const MyCard = ({ review }) => {
  const [helpful, setHelpful] = useState(10);
  const [unhelpful, setUnHelpful] = useState(5);
  const [helpfulClicked, setHelpfulClicked] = useState(false);
  const [unhelpfulClicked, setUnhelpfulClicked] = useState(false);

  const helpfulHandler = (type) => {
    if (type === "up" && !helpfulClicked) {
      setHelpful(helpful + 1);
      setHelpfulClicked(true);

      if (unhelpfulClicked) {
        setUnHelpful(unhelpful - 1);
        setUnhelpfulClicked(false);
      }
    } else if (type === "down" && !unhelpfulClicked) {
      setUnHelpful(unhelpful + 1);
      setUnhelpfulClicked(true);

      if (helpfulClicked) {
        setHelpful(helpful - 1);
        setHelpfulClicked(false);
      }
    }
  };

  function formateDate(dateString) {
    const date = new Date(dateString);
    const formattedDate = new Intl.DateTimeFormat("es-AR", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date);
    return formattedDate;
  }

  return (
    <MyCardStyles.CardRoot>
      <MyCardStyles.CardHeader>
        <MyCardStyles.StyledAvatar
          alt="User Avatar"
          src={review.avatar || "https://i.imgur.com/JSW6mEk.png"}
        />
        <MyCardStyles.SubHeadingsTypography variant="body1">
          {review.name}
        </MyCardStyles.SubHeadingsTypography>
        <MyCardStyles.BodyTextTypography
          variant="body1"
          color="textSecondary"
          style={{ marginLeft: "12rem" }}
        >
          {formateDate(review.createdAt)}
        </MyCardStyles.BodyTextTypography>
      </MyCardStyles.CardHeader>
      <div>
        <MyCardStyles.StyledRating
          value={4}
          precision={0.5}
          size="midium"
          readOnly
        />
      </div>
      <MyCardStyles.TitleTypography variant="h6">
        {review.title}
      </MyCardStyles.TitleTypography>
      <MyCardStyles.CommentTextTypography variant="body1">
        {review.comment}
      </MyCardStyles.CommentTextTypography>
      <MyCardStyles.RecommendTypography variant="body1">
        ¿Recomendarías este producto?{" "}
        {review.recommend ? (
          <MyCardStyles.YesSpan>Si!</MyCardStyles.YesSpan>
        ) : (
          <MyCardStyles.NoSpan>No!</MyCardStyles.NoSpan>
        )}
      </MyCardStyles.RecommendTypography>
      <MyCardStyles.HelpfulContainer>
        <MyCardStyles.SubHeadingsTypography
          variant="body2"
          color="textSecondary"
        >
          ¿Útil?
        </MyCardStyles.SubHeadingsTypography>
        <MyCardStyles.ThumbIcon clicked={helpfulClicked}>
          <MyCardStyles.StyledThumbUpIcon
            onClick={() => helpfulHandler("up")}
          />
        </MyCardStyles.ThumbIcon>
        <MyCardStyles.BodyTextTypography>
          {helpful}
        </MyCardStyles.BodyTextTypography>
        <MyCardStyles.ThumbIcon clicked={unhelpfulClicked}>
          <MyCardStyles.StyledThumbDownIcon
            onClick={() => helpfulHandler("down")}
          />
        </MyCardStyles.ThumbIcon>
        <MyCardStyles.BodyTextTypography>
          {unhelpful}
        </MyCardStyles.BodyTextTypography>
      </MyCardStyles.HelpfulContainer>
    </MyCardStyles.CardRoot>
  );
};

export default MyCard;
