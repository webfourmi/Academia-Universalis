let restoringCampusRoute = false;

function rememberCampusRoute(kind, fields = {}) {
  if (restoringCampusRoute) return;
  const route = {kind, tab, ...fields};
  const previous = history.state?.academia;
  if (JSON.stringify(previous?.route) === JSON.stringify(route)) return;
  if (previous) {
    history.replaceState({academia:{route:previous.route, scroll:scrollY}},'');
    history.pushState({academia:{route,scroll:0}},'');
  } else {
    history.replaceState({academia:{route,scroll:0}},'');
  }
}

function restoreCampusRoute(entry) {
  const route = entry?.route;
  if (!route) return;
  restoringCampusRoute = true;
  try {
    saveReading();
    toggleInstallation(false);
    tab = route.tab;
    render();
    switch (route.kind) {
      case 'course': {
        const item = allStudyCourses().find(course=>course.key===route.key);
        if (item) showCourse(item);
        break;
      }
      case 'lesson': {
        const target = locateLesson(route.key,route.id);
        if (target) showLesson(target.course,target.index,{fromNote:route.fromNote});
        break;
      }
      case 'review': {
        const target = locateLesson(route.key,route.id);
        if (target) showQuickReview(target.course,target.index);
        break;
      }
      case 'subject': course(route.year,route.index,route.archives); break;
      case 'space': showSpace(route.name); break;
      case 'projects': showWrittenProjects(); break;
      case 'assessment':
      case 'assessment-result': {
        const assessment = assessmentOptions().find(item=>item.key===route.key);
        if (assessment && route.kind==='assessment') showAssessment(assessment);
        if (assessment && route.kind==='assessment-result') showAssessmentResult(assessment,route.selections);
        break;
      }
    }
    window.scrollTo({top:entry.scroll||0,behavior:'instant'});
  } finally {
    restoringCampusRoute = false;
  }
}

function initializeCampusHistory() {
  if ('scrollRestoration' in history) history.scrollRestoration='manual';
  history.replaceState({academia:{route:{kind:'tab',tab},scroll:0}},'');
  render();
  window.addEventListener('popstate',event=>restoreCampusRoute(event.state?.academia));
}
