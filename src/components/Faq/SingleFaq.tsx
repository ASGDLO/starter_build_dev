const SingleFaq = (props: { question: string; answer: string }) => {
  const { question, answer } = props;

  return (
    <>
    <div className="mb-12 flex lg:mb-[70px]">
            <div
              className="bg-primary mr-4 flex h-[50px] w-full max-w-[50px] items-center justify-center rounded-xl text-white sm:mr-6 sm:h-[60px] sm:max-w-[60px]">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.32-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.63.283.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
              </svg>
            </div>
            <div className="w-full">
              <h3 className="mb-6 text-xl font-semibold text-dark dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                {question}
              </h3>
              <p className="text-base text-body-color dark:text-dark-6">
                {answer}
              </p>
            </div>
          </div>
    
    </>
  );
};

export default SingleFaq;
