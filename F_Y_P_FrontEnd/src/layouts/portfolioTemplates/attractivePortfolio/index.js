import React from "react";

const AttractivePortfolioTemplate = () => {
  return (
    <div id="page" className="s-pagewrap ss-home">
      <section id="content" className="s-content">
        <section id="intro" className="s-intro">
          <div className="row s-intro__content width-sixteen-col">
            <div className="column lg-12 s-intro__content-inner grid-block">
              <div className="s-intro__content-text">
                <div className="s-intro__content-pretitle text-pretitle">
                  Hello, I'm Monica
                </div>
                <h1 className="s-intro__content-title">
                  I create marketing <br />
                  strategies for your <br />
                  business that get <br />
                  results.
                </h1>
              </div>

              <div className="s-intro__content-media">
                <div className="s-intro__content-media-inner">
                  <img
                    src="images/intro-bg.jpg"
                    srcSet="images/intro-bg.jpg 1x, images/intro-bg@2x.jpg 2x"
                    alt=""
                  />
                  <div className="lines">
                    <span></span>
                  </div>
                </div>
              </div>

              <div className="s-intro__scroll-down">
                <a href="#about" className="smoothscroll">
                  <div className="scroll-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="36"
                      height="36"
                      fill="none"
                      stroke="#97b34a"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="7 13 12 18 17 13"></polyline>
                      <line x1="12" y1="18" x2="12" y2="6"></line>
                    </svg>
                  </div>
                  <span>Scroll for more</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="s-about target-section">
          <div className="row s-about__content width-sixteen-col">
            <div className="column grid-block grid-section-split">
              <img
                src="images/geometric_shape.svg"
                alt=""
                className="s-about__content-imgbg"
              />

              <div className="section-header grid-section-split__header">
                <div className="text-pretitle">About</div>
                <h2 className="text-display-title">
                  An inspiring headline about yourself.
                </h2>
              </div>

              <div className="s-about__content-main grid-section-split__primary">
                <p className="attention-getter">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Repellendus iste ipsam quod repellat. Hic tempora ullam
                  aperiam ipsum optio magni vel inventore voluptatibus nisi
                  maiores laboriosam fuga iure, velit eligendi ab vero minima?
                  Quae ducimus ab dignissimos iure, eos consequatur est deleniti
                  cum id aliquid neque.
                </p>

                <p className="attention-getter">
                  Autem tenetur commodi maiores. Lorem ipsum dolor sit, amet
                  consectetur adipisicing elit. Est eligendi fugit, facilis
                  velit reiciendis iure laudantium. Praesentium repellat
                  corrupti dolor sit sint obcaecati. Modi aut quo molestiae a
                  explicabo maiores necessitatibus nemo repellendus architecto?
                  Corrupti numquam ullam nostrum, eveniet at doloribus
                  blanditiis aliquid a est porro aspernatur pariatur culpa
                  soluta nesciunt odio quasi maxime debitis illum.
                </p>

                <p className="attention-getter">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Repellendus iste ipsam quod repellat. Hic tempora ullam
                  aperiam ipsum optio magni vel inventore voluptatibus nisi
                  maiores laboriosam fuga iure, velit eligendi ab vero minima?
                  Quae ducimus ab dignissimos iure, eos consequatur est deleniti
                  cum id aliquid neque.
                </p>
              </div>

              <div className="s-about__content-btn grid-section-split__bottom">
                <a className="btn btn--stroke u-fullwidth" href="#about">
                  More About Me
                </a>
              </div>
            </div>
          </div>
          <section id="clients" className="s-clients">
            <div className="row s-clients__content-block width-sixteen-col">
              <div className="column xl-12 grid-block grid-section-split">
                <div className="section-header grid-section-split__header">
                  <img
                    src="https://via.placeholder.com/600x400"
                    alt="Project Image"
                  />
                </div>

                <div className="grid-section-split__primary">
                  <p className="lead">
                    Quibusdam quis autem voluptatibus earum vel ex error ea.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Laborum suscipit debitis quam dignissimos veritatis atque
                    pariatur magnam obcaecati fugit reprehenderit vel numquam
                    facere esse est deserunt, perferendis commodi voluptatem
                    similique.
                  </p>

                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Porro, numquam molestiae vel quaerat quas facilis voluptates
                    rerum aspernatur quam voluptatem ea, vitae illo, omnis minus
                    vero minima maiores quia nihil incidunt provident debitis ab
                    qui quasi. Iure unde numquam in nulla praesentium nesciunt
                    dolore exercitationem, odit expedita minima quisquam ullam
                    ex. Aut perferendis vel consectetur modi esse. Temporibus
                    reprehenderit alias magni atque repellat aspernatur
                    voluptates, accusantium pariatur libero ad nesciunt illum
                    labore facere. Earum iure consequatur cumque omnis maiores
                    optio.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </section>
      </section>
    </div>
  );
};

export default AttractivePortfolioTemplate;
