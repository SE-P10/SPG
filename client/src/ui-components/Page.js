import { React } from "react";
import { Container } from "react-bootstrap";

const processProps = (props) => {

  let className = (props.className || '');

  let style = props.style || {};

  if (props.center) {
    className += " text-center"
  }

  if (props.width && props.height) {
    style = { ...style, width: props.width, height: props.height };
  }

  return [style, className]
}


const PageTitle = (props) => {

  let [style, className] = processProps(props);
  className += " im-page-title"

  return (
    <h1 className={className} style={{ ...style }} >
      {props.children}
    </h1>
  );
}

const BlockTitle = (props) => {

  let [style, className] = processProps(props);
  className += " im-block-title"

  return (
    <h2 className={className} style={{ ...style }} >
      {props.children}
    </h2>
  );
}

const PageSection = (props) => {

  let [style, className] = processProps(props);

  className += " im-container im-container--filled im-responsive"

  return (
    <section className={className} style={{ ...style }}  >
      <Container className='justify-content-center'>
        {props.children}
      </Container>
    </section>
  );
}

const Page = (props) => {

  let [style, className] = processProps(props);

  className += " im-responsive"

  return (
    <Container className={className} style={{ ...style }} >
      {props.children}
    </Container>
  );
}

const PageContainer = (props) => {

  let [style, className] = processProps(props);

  className += " im-container im-responsive im-grid justify-content-center"

  return (
    <section className={className} style={{ ...style }} >
      {props.children}
    </section>
  );
}



const PageSeparator = (props) => {

  let [style, className] = processProps(props);

  className += " im-separator"

  return (
    <div className={className} style={{ ...style }} />
  );
}

const SVGIcon = (props) => {

  let [style, className] = processProps(props);
  let icon = props.icon;

  className += "im-svg-icon"

  return (
    <div className={className} style={{ ...style }} >
      {icon}
    </div>
  );
};



export { Page, PageContainer, PageSection, PageTitle, PageSeparator, BlockTitle, SVGIcon };
