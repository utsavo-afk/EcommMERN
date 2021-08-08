import React from "react";

function Footer() {
  return (
    <div>
      <footer className="text-center">
        <p className="text-muted" style={{ fontSize: "12px" }}>
          Did you enjoy devROCKET,{" "}
          <a href="mailto:utsavojha0@gmail.com?subject = Feedback&body = Message">
            Send Feedback
          </a>
          . Check out more projects on my{" "}
          <a
            href="https://github.com/webzth/webzth"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
          . 2021 &#169; Utsav Ojha
        </p>
      </footer>
    </div>
  );
}

export default Footer;
