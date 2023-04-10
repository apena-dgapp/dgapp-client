import React, { useState } from "react";
import useGetData from "../../../hooks/useGetData";
import { useEffect } from "react";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import "./Index.scss";
import { useParams } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import GlobalContext from "../../../context/GlobalContext";
import ModuleForm from "./ModuleForm";
import { FetchCourse, FetchSection, FetchContent } from "./FetchData/Index";

const queryClient = new QueryClient();
const Index = () => {
  const auth = GlobalContext._currentValue[0].userName;

  const urlAPI = process.env.REACT_APP_API;
  const { courseId } = useParams();

  const [contentModule, setContentModule] = useState(null);
  const [sectionsInfo, setSectionsInfo] = useState([]);
  const [globalInfo, setGlobalInfo] = useState({
    duration: 0,
    count: 0,
    checkCount: 0,
  });
  const [show, setShow] = useState({
    progress: false,
    moduleExamIntro: false,
    moduleExamStarted: false,
    moduleExamResults: false,
  });
  const [pageExam, setPageExam] = useState(0);
  const [answersId, setAnswersId] = useState([]);
  const [results, setResults] = useState(0);
  const [previousGrade, setPreviousGrade] = useState({
    grade: null,
    alreadyTaken: false,
    date: null,
  });

  const romanNumerals = [
    "I",
    "II",
    "III",
    "IV",
    "V",
    "VI",
    "VII",
    "VIII",
    "IX",
    "X",
  ];

  const weekDaysText = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];

  const monthsText = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];

  const [refresh, setRefresh] = useState(false);
  const recordData = useGetData(
    `${urlAPI}record/getrecords/${courseId}/${auth}`,
    refresh
  );
 

  const [courseData, setCourseData] = useState([]);
  const [sectionData, setSectionData] = useState([]);
  const [contentData, setContentData] = useState([]);
  const [loading, setLoading] = useState({
    course: true,
    section: true,
    content: true,
  });

  function totalContentsPerSection() {
    try {
      if (sectionsInfo.length !== 0 || recordData.data === null ) return;

      let globalDuration = 0;
      let globalCount = 0;
      let globalCheckCount = 0;
      const lastContentIdSeenCookie = parseInt(Cookies.get(
        `module-${courseId}-lastcontent-id`
        ))
        
        let isThisContentShowingAtFirst;
      const oldArray = [];
      const exampleArray=[]
      sectionData.forEach((section) => {
        let count = 0;
        let checkCount = 0;
        let duration = 0;
        // const oldArray = sectionsInfo;
        isThisContentShowingAtFirst = false;

        contentData.forEach((content) => {
          if (section.id === content.sectionId) {
            count++;
            duration += content.duration;
            recordData?.data.forEach((record) => {
              if (record?.contentId !== content.id) return;
              if (!record?.checked) return;
              checkCount++;
            });
            
          }
          if(lastContentIdSeenCookie ===  content.id) {
            isThisContentShowingAtFirst = true
          }
        });
        exampleArray.push({
          id: section.id
        })
        
        console.log({
          id: section.id
        });
        
        oldArray.push({
          id: section.id,
          count: count,
          checkCount: checkCount,
          duration: duration,
          show: isThisContentShowingAtFirst,
        });
        globalDuration += duration;
        globalCount += count;
        globalCheckCount += checkCount;
      });
      setSectionsInfo(oldArray);
      setGlobalInfo({
        duration: globalDuration,
        count: globalCount,
        checkCount: globalCheckCount,
      });
    } catch (error) {
      console.log(sectionData, contentData, recordData);
      console.error("Error in totalContentsPerSection");
    }
  }
  
  function checkContent(contentId) {
    try {
      if(recordData.data === null) return false
      let bool = false;
      recordData?.data.forEach((record) => {
        // console.log(record);
        if (record.userName !== auth) return;
        if (contentId !== record.contentId) return;
        if (!record.checked) return;
        bool = true;
      });
      return bool;
    } catch (error) {
      console.error("Error in method checkContent " + error);
    }
  }

  function showSection(index, boolCookie) {
    try {
      if (!boolCookie) { //Show a section by clicking
        const currentSection = {
          ...sectionsInfo[index],
          show: !sectionsInfo[index].show,
        };
        const filtered = sectionsInfo.filter(
          (section) => section.id !== currentSection.id
        );
        setSectionsInfo(
          [...filtered, currentSection].sort((a, b) => {
            return a.id - b.id;
          })
        );
      }

      if (contentModule || !sectionsInfo.length > 0 ) return;

      // const currentSection = {
      //   ...sectionsInfo[index],
      //   show: !sectionsInfo[index].show,
      // };
      
      // const filtered = sectionsInfo.filter(
      //   (section) => section.id !== currentSection.id
      // );

      // setSectionsInfo(
      //   [...filtered, currentSection].sort((a, b) => {
      //     return a.id - b.id;
      //   })
      // );
      setRefresh(true)
    } catch (error) {
      
      console.error("Error in ShowSection");
    }
  }


  function handleContent(content) {
    setContentModule({
      content: content?.content,
      contentType: content?.content_Type,
      description: content?.description,
      image: content?.image,
    });
    Cookies.set(`module-${courseId}-lastcontent-id`, content.id);
  }

  function handleCheck(contentId, previousCheckValue, positionInTheArray) {
    try {
      axios
        .post(`${urlAPI}record/create`, {
          userName: auth,
          courseId: courseData[0].id,
          contentId: contentId,
          checked: !previousCheckValue,
        })
        .then(() => {
          setGlobalInfo({
            ...globalInfo,
            checkCount: !previousCheckValue
              ? globalInfo.checkCount + 1
              : globalInfo.checkCount - 1,
          });
          const currentSection = {
            ...sectionsInfo[positionInTheArray],
            checkCount: !previousCheckValue
              ? sectionsInfo[positionInTheArray].checkCount + 1
              : sectionsInfo[positionInTheArray].checkCount - 1,
          };

          const filtered = sectionsInfo.filter(
            (section) => section.id !== currentSection.id
          );

          setSectionsInfo(
            [...filtered, currentSection].sort((a, b) => {
              return a.id - b.id;
            })
          );

          setRefresh(true);
        });
    } catch (error) {
      console.error(error);
    }
  }

  function createMarkup(htmlTags) {
    try {
      if(!htmlTags) return  
      const tagsArray = htmlTags.split("<br>");
      return tagsArray.map((tag, index) => {
        return <div key={index} dangerouslySetInnerHTML={{ __html: tag }} />;
      });
    } catch (error) {
      console.error("Error in function CreateMarkup");
    }
  }

  function moveThroughPages(move) {
    if (!move && pageExam > 0) {
      setPageExam(pageExam - 1);
    }
    if (move && contentModule?.content.length - 1 > pageExam) {
      setPageExam(pageExam + 1);
    }
  }

  function handleAnswersSelected(materialId, questionId) {
    const currentAnswer = {
      materialId: materialId,
      questionId: questionId,
    };

    const filtered = answersId.filter(
      (answer) => answer.materialId !== materialId
    );

    setAnswersId(
      [...filtered, currentAnswer].sort((a, b) => {
        return a.materialId - b.materialId;
      })
    );
  }

  function isASelectedAnswer(materialId, questionId) {
    let check = false;

    for (let i = 0; i <= answersId.length - 1; i++) {
      if (
        answersId[i].materialId === materialId &&
        questionId === answersId[i].questionId
      ) {
        check = true;
      }
    }

    return check;
  }

  function handleResultExam() {
    try {
      let correctAnswers = 0;
      let incorrectAnswers = 0;

      contentModule.content.forEach((content) => {
        content.questions.forEach((question) => {
          answersId.forEach((answer) => {
            if (content.id !== answer.materialId) return;
            if (question.id !== answer.questionId) return;
            if (!question.value) {
              incorrectAnswers++;
              return;
            }
            correctAnswers++;
          });
        });
      });
      showResultsPorcentage(correctAnswers, incorrectAnswers);
      setResults({ correct: correctAnswers, incorrect: incorrectAnswers });

      axios
        .post(`${urlAPI}record/create`, {
          userName: auth,
          courseId: courseData?.data[0]?.id,
          contentId: contentModule?.id,
          checked: true,
          grade: showResultsPorcentage(correctAnswers, incorrectAnswers),
        })
        .then(() => {
          handleCheck(
            contentModule?.id,
            false,
            contentModule?.positionInTheArray
          );
        });
    } catch (error) {
      console.error("Error in handleResultExam");
    }
  }

  function showResultsPorcentage(correct, incorrect) {
    const actualDate = new Date();
    const date = `${
      weekDaysText[actualDate.getDay()]
    }, ${actualDate.getDate()} de ${
      monthsText[actualDate.getMonth()]
    } de ${actualDate.getFullYear()}`;
    const grade = ((correct / (correct + incorrect)) * 100).toFixed(2);
    setPreviousGrade({ date: date, grade: grade, alreadyTaken: true });
    return grade;
  }

  function resetExam() {
    setShow({
      progress: false,
      moduleExamIntro: true,
      moduleExamStarted: false,
      moduleExamResults: false,
    });
    setPageExam(0);
    setResults(0);
    setAnswersId([]);
  }

  function handleFinishedExam() {
    if (answersId.length !== contentModule.content.length) {
      toast.error("Primero debes llenar el examen");
      return;
    }
    moveThroughPages(false);
    setShow({
      ...show,
      moduleExamResults: true,
      moduleExamStarted: false,
    });
    handleResultExam();
  }

  function convertJsonToObject(text) {
    try {
      return JSON.parse(text);
    } catch (error) {
      console.error("Error al convertir el JSON" + error);
    }
  }

  useEffect(() => {
    const lastContentId = Cookies.get(`module-${courseId}-lastcontent-id`);
    if (
      lastContentId === undefined &&
      !contentData.length > 0 &&
      contentModule === null
    ) {
      const firstContent = contentData[0];
      showSection(0)
      return setContentModule({
        content: firstContent?.content,
        contentType: firstContent?.content_Type,
        image: firstContent?.image,
        description: firstContent?.description,
      });
    }

    // if (
    //   lastContentId === null ||
    //   contentData.length > 0 ||
    //   contentModule ||
    //   sectionsInfo.length === 0
    // ) {
    //   console.log(lastContentId === undefined, contentData.length > 0, contentModule,sectionsInfo.length === 0);
    //   return
    // }

    if (contentModule !== null || !sectionsInfo.length > 0) return;

    contentData?.forEach((content, index) => {
      if (parseInt(content.id) !== parseInt(lastContentId)) return;
      setContentModule({
        content: content?.content,
        contentType: content?.content_Type,
        image: content?.image,
        description: content?.description,
      });
      let searchSectionId;
      sectionData.forEach((section, position) => {
        if(section.id !== content.sectionId) return
        searchSectionId = position
      })
      showSection(searchSectionId, false);
    });
  }, [contentData, contentModule, sectionData, sectionsInfo]);

  useEffect(() => {
    if (!courseData.length > 0) return;
    axios.put(`${urlAPI}course/update/${courseData[0].id}`, {
      views: courseData[0].views + 1,
    });
  }, [courseData]);

  useEffect(() => {
    setRefresh(false);
  }, [refresh]);

  useEffect(() => {
    if (
      !courseData.length > 0 ||
      !sectionData.length > 0 ||
      !contentData.length > 0 ||
      !recordData === null
    )
      return;
    totalContentsPerSection();
  }, [courseData, sectionData, contentData, recordData]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <FetchCourse
          courseId={courseId}
          setCourseData={setCourseData}
          setLoading={setLoading}
          courseData={courseData}
          loading={loading}
        />
        <FetchSection
          courseId={courseId}
          setSectionData={setSectionData}
          setLoading={setLoading}
          sectionData={sectionData}
          loading={loading}
        />
        <FetchContent
          courseId={courseId}
          setContentData={setContentData}
          setLoading={setLoading}
          contentData={contentData}
          loading={loading}
        />
        <ModuleForm
          courseLoading={loading?.course}
          course={courseData}
          sections={sectionData}
          sectionLoading={loading?.section}
          contents={contentData}
          contentLoading={loading?.content}
          contentModule={contentModule}
          records={recordData?.data}
          checkContent={checkContent}
          sectionsInfo={sectionsInfo}
          show={show}
          setShow={setShow}
          globalInfo={globalInfo}
          showSection={showSection}
          setContentModule={setContentModule}
          handleCheck={handleCheck}
          handleContent={handleContent}
          Cookies={Cookies}
          createMarkup={createMarkup}
          pageExam={pageExam}
          setPageExam={setPageExam}
          moveThroughPages={moveThroughPages}
          answersId={answersId}
          setAnswersId={setAnswersId}
          handleAnswersSelected={handleAnswersSelected}
          isASelectedAnswer={isASelectedAnswer}
          handleResultExam={handleResultExam}
          results={results}
          showResultsPorcentage={showResultsPorcentage}
          resetExam={resetExam}
          handleFinishedExam={handleFinishedExam}
          toast={toast}
          previousGrade={previousGrade}
          convertJsonToObject={convertJsonToObject}
          courseId={courseId}
          romanNumerals={romanNumerals}
        />
      </QueryClientProvider>
    </>
  );
};

export default Index;
