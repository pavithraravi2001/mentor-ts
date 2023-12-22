import { Timetable } from "./model";

export const createTimetableService = async (body) => {
  return new Promise((resolve, reject) => {
    Timetable.findOne({
      academicYear: body.academicYear,
      classGrade: body.classGrade,
      section: body.section,
    })
      .then((existingTimetable) => {
        if (existingTimetable) {
          const error = new Error();
          error.status = 409;
          error.message =
            "Timetable already exists for the specified academic year, class, and section.";
          reject(error);
        } else {
          Timetable.create(body)
            .then((doc) => {
              resolve(doc);
            })
            .catch((err) => {
              reject(err);
            });
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getTimetableService = async (queryParams) => {
  const { academicYear, classGrade, section } = queryParams;
  const query = {};
  if (academicYear) {
    query.academicYear = academicYear;
  }
  if (classGrade) {
    query.classGrade = classGrade;
  }
  if (section) {
    query.section = section;
  }
  try {
    const timetables = await Timetable.findOne(query);
    return timetables;
  } catch (error) {
    throw error;
  }
};

export const updateTimetableService = async (queryParams, updateData) => {
  let { academicYear, classGrade, section } = queryParams;
  const $and = [];
  if (academicYear) {
    $and.push({ academicYear: academicYear });
  }
  if (classGrade) {
    $and.push({ classGrade: classGrade });
  }
  if (section) {
    $and.push({ section: section });
  }
  const query = $and.length > 0 ? { $and: $and } : {};
  try {
    const timetables = await Timetable.findOneAndUpdate(query, updateData, {
      new: true,
    });
    return timetables;
  } catch (error) {
    throw error;
  }
};
