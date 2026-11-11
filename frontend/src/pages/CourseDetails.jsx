import "../styles/coursedetails.css";

export default function CourseDetails() {
  return (
    <div className="course-container">
      <h2>BSE222 </h2>
      <p>Professor: Ashok Kumar</p>
      <p>Year: 2024-25, Semester: Even</p>
      <br />
      <section>
        <h3>Description</h3>
        <p></p>
      </section>

      <section>
        <h3>Resources</h3>
        <section className="inner-section">
          <p>Lectures</p>
          <table>
            <tbody>
              <tr>
                <td>Lecture 1</td>
                <td>
                  <a href="..." target="_blank">
                    📄 View
                  </a>
                </td>
              </tr>
              <tr>
                <td>Lecture 2</td>
                <td>
                  <a href="..." target="_blank">
                    📄 View
                  </a>
                </td>
              </tr>
              <tr>
                <td>Lecture 3</td>
                <td>
                  <a href="..." target="_blank">
                    📄 View
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="inner-section">
          <p>Exam papers</p>
          <table>
            <tbody>
              <tr>
                <td>Quiz 1</td>
                <td>
                  <a href="..." target="_blank">
                    📄 View
                  </a>
                </td>
              </tr>
              <tr>
                <td>Mid-sem</td>
                <td>
                  <a href="..." target="_blank">
                    📄 View
                  </a>
                </td>
              </tr>
              <tr>
                <td>End-sem</td>
                <td>
                  <a href="..." target="_blank">
                    📄 View
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </section>
      <br />
    </div>
  );
}
