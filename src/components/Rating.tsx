import styled from "@emotion/styled";
import { transparentize } from "polished";
import { wanpaku } from "../styles/fonts/wanpaku";

const RatingContainer = styled.div`
  ${wanpaku}
  display: inline-flex;
  box-shadow: inset 0 0 0.2em ${transparentize(0.2, "white")};
  padding: 0.2em;
  border-radius: 0.2em;
`;

const RatingContainerWhite = styled(RatingContainer)`
  background: #ddd;
`;

const RatingContainerBlue = styled(RatingContainer)`
  background: #5dd1fd;
`;

const RatingContainerGreen = styled(RatingContainer)`
  background: #b0ff82;
`;

const RatingContainerYellow = styled(RatingContainer)`
  background: #ffcc3e;
`;

const RatingContainerRed = styled(RatingContainer)`
  background: #ff9293;
`;

const RatingContainerPurple = styled(RatingContainer)`
  background: #daa0ff;
`;

const RatingContainerBronze = styled(RatingContainer)`
  background-image: linear-gradient(120deg, #fb8d51, #8e432d, #fb8d51);
`;

const RatingContainerSilver = styled(RatingContainer)`
  background-image: linear-gradient(120deg, #9bd1f4, #cbecf8, #9bd1f4);
`;

const RatingContainerGold = styled(RatingContainer)`
  background-image: linear-gradient(120deg, #fbb60b, #fffee7, #fbb60b, #fdcf03);
`;

const RatingContainerPlatinum = styled(RatingContainer)`
  background-image: linear-gradient(120deg, #f8dc62, #fcfdf0, #f8dc62, #fcf282);
`;

const RatingContainerRainbow = styled(RatingContainer)`
  background-image: linear-gradient(
    120deg,
    #7ee2b3,
    #6bc8fe,
    #91f37f,
    #fff127,
    #ffb75c,
    #fdb0ac,
    #ffb75c,
    #fff127,
    #91f37f
  );
`;

const RatingDigit = styled.span`
  display: block;
  flex: 1;
  text-align: center;
  line-height: 1.2;
  padding: 0.2em 0.1em 0.1em 0.1em;
  background-image: linear-gradient(to bottom, #585757 70%, #7a7a7a 70%);
  outline: 1px solid #524d4d;
  color: #fdea1b;
  text-shadow: 0 0 0.1em #000;
  &:first-of-type {
    border-radius: 0.1em 0 0 0.1em;
  }
  &:last-of-type {
    border-radius: 0 0.1em 0.1em 0;
  }
`;

interface Props {
  rating: number;
}

const Rating = ({ rating }: Props) => {
  const ratingDigits = rating.toString().padStart(5, " ").split("");
  const component = ratingDigits.map((digit, i) => (
    <RatingDigit key={i}>{digit}</RatingDigit>
  ));

  if (rating < 1000) {
    return <RatingContainerWhite>{component}</RatingContainerWhite>;
  }
  if (rating < 2000) {
    return <RatingContainerBlue>{component}</RatingContainerBlue>;
  }
  if (rating < 4000) {
    return <RatingContainerGreen>{component}</RatingContainerGreen>;
  }
  if (rating < 7000) {
    return <RatingContainerYellow>{component}</RatingContainerYellow>;
  }
  if (rating < 10000) {
    return <RatingContainerRed>{component}</RatingContainerRed>;
  }
  if (rating < 12000) {
    return <RatingContainerPurple>{component}</RatingContainerPurple>;
  }
  if (rating < 13000) {
    return <RatingContainerBronze>{component}</RatingContainerBronze>;
  }
  if (rating < 14000) {
    return <RatingContainerSilver>{component}</RatingContainerSilver>;
  }
  if (rating < 14500) {
    return <RatingContainerGold>{component}</RatingContainerGold>;
  }
  if (rating < 15000) {
    return <RatingContainerPlatinum>{component}</RatingContainerPlatinum>;
  }
  return <RatingContainerRainbow>{component}</RatingContainerRainbow>;
};

export default Rating;
