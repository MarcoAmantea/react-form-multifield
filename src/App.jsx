import { useState } from "react";

const initialFormData = {
  image: "",
  content: "",
  category: "",
  published: false,
};

function App() {
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState(initialFormData);

  const handlePostForm = (event) => {
    event.preventDefault();

    if (!formData.image || !formData.content || !formData.category) {
      alert("Tutti i campi sono obbligatori");
      return;
    }

    const newPost = {
      ...formData,
      id: Date.now(),
    };

    setPosts([...posts, newPost]);
    setFormData(initialFormData);
  };

  const deletePost = (idToDelete) => {
    setPosts(posts.filter((post) => post.id !== idToDelete));
  };

  const handleInputChange = (event) => {
    const { name, type, value, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: newValue,
    }));
  };

  return (
    <>
      <div className="container">
        <section>
          <h2 className="text-white">I nostri post</h2>
          {posts.length > 0 ? (
            <div className="row row-cols-2 row-cols-lg-3">
              {posts.map((post) => (
                <div className="col" key={post.id}>
                  <div className="card">
                    <img
                      src={post.image}
                      alt="Post thumbnail"
                      className="card-img-top"
                    />
                    <div className="card-body">
                      <h4>Categoria: {post.category}</h4>
                      <p>{post.content}</p>
                      <p>
                        <strong>
                          {post.published ? "Pubblicato" : "Bozza"}
                        </strong>
                      </p>
                      <button
                        onClick={() => deletePost(post.id)}
                        className="btn btn-danger"
                      >
                        Elimina
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-white">Nessun post presente</p>
          )}
        </section>

        <section>
          <h3 className="text-white">Aggiungi un nuovo post</h3>
          <form onSubmit={handlePostForm}>
            <div className="mb-3">
              <label htmlFor="postImage" className="text-white">URL Immagine</label>
              <input
                type="text"
                className="form-control"
                name="image"
                id="postImage"
                value={formData.image}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="postContent" className="text-white">Contenuto</label>
              <textarea
                name="content"
                id="postContent"
                className="form-control"
                value={formData.content}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="postCategory" className="text-white">Categoria</label>
              <select
                name="category"
                id="postCategory"
                className="form-select"
                value={formData.category}
                onChange={handleInputChange}
              >
                <option value="">Seleziona una categoria</option>
                <option value="Tecnologia">Tecnologia</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Cucina">Cucina</option>
                <option value="Viaggi">Viaggi</option>
              </select>
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                name="published"
                id="postPublished"
                className="form-check-input"
                checked={formData.published}
                onChange={handleInputChange}
              />
              <label htmlFor="postPublished" className="form-check-label text-white">
                Pubblica subito
              </label>
            </div>
            <button type="submit" className="btn btn-primary">
              Salva
            </button>
          </form>
        </section>
      </div>
    </>
  );
}

export default App;
