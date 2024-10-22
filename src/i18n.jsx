import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            pageHeader: "The CRUD Post Application",
            postForm: "Post Form",
            titleText: "Title",
            validTitle: "Please enter a valid title.",
            userText: "User ID",
            validId: "Please enter a valid User ID.",
            body: "Body",
            validBody: "Please enter a valid Post Body.",
            updateText: "Update Post",
            addText: "Add Post",
            adding: "Adding...",
            updating: "Updating...",
            formPostTitle: "Enter Title",
            formUserId: "Enter UserID",
            filterText: "Filter by User ID",
            editText: "Edit",
            deleteText: "Delete",
            errorText: "An error occurred:",
            alertUpdateText: "Post successfully updated",
            alertCreateText: "Post successfully created",
            fetchError: "Error fetching data",
            loadingText: "Loading...",
        },
    },
    pt: {
        translation: {
            pageHeader: "O CRUD Pós-inscrição",
            postForm: "Formulário de Postagem",
            titleText: "Título",
            validTitle: "Por favor, forneça um título de postagem válido.",
            userText: "ID do Usuário",
            validId: "Por favor, forneça um ID de usuário válido.",
            body: "Corpo",
            validBody: "Por favor, forneça um corpo de postagem válido.",
            updateText: "Atualizar Postagem",
            addText: "Adicionar Postagem",
            adding: "Adicionando...",
            updating: "Atualizando...",
            formPostTitle: "Digite o Título",
            formUserId: "Digite o ID do Usuário",
            filterText: "Filtrar por ID de utilizador",
            editText: "Editar",
            deleteText: "Eliminar",
            errorText: "Ocorreu um erro:",
            alertUpdateText: "Postagem atualizada com sucesso",
            alertCreateText: "Postagem criada com sucesso",
            fetchError: "Erro ao pesquisar dados",
            loadingText: "Carregando...",
        },
    },

};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'en',
        keySeparator: false,
        interpolation: {
            escapeValue: false,
        },
    });

    export default i18n;