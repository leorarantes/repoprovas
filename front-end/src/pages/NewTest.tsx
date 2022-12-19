import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { AxiosError } from "axios";

import useAuth from "../hooks/useAuth";
import useAlert from "../hooks/useAlert";
import Form from "../components/Form";
import api, { TestByTeacher, Category, NewTestData } from "../services/api";
import {
    Box,
    Button,
    Divider,
    TextField,
    Autocomplete
} from "@mui/material";

function NewTest() {
    const navigate = useNavigate();
    const { token } = useAuth();
    const { setMessage } = useAlert();
    const [teachersDisciplines, setTeachersDisciplines] = useState<
        TestByTeacher[]
    >([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [formData, setFormData] = useState<NewTestData>({
        teacher: "",
        discipline: "",
        category: "",
        pdfUrl: "",
        name: ""
    });

    useEffect(() => {
        async function loadPage() {
            if (!token) return;
            const { data: testsData } = await api.getTestsByTeacher(token);
            setTeachersDisciplines(testsData);
            const { data: categoriesData } = await api.getCategories(token);
            setCategories(categoriesData);
        }
        loadPage();
    }, [token]);

    function handleInputChange(e: React.SyntheticEvent<Element, Event>, value: string) {
        if(e !== null) {
            if(e.currentTarget.tagName === 'INPUT') {
                setFormData({ ...formData, [e.currentTarget.id]: value });
            }
            else if(e.currentTarget.tagName === 'LI') {
                const i = e.currentTarget.id.indexOf('-');
                setFormData({ ...formData, [e.currentTarget.id.slice(0, i)]: value });
            }
            else {
                if(e.currentTarget.parentElement?.parentElement?.firstElementChild?.id) {
                    setFormData({ ...formData, [e.currentTarget.parentElement?.parentElement?.firstElementChild?.id]: value });
                }
            }
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setMessage(null);

        if (!formData?.teacher || !formData?.discipline || !formData?.category || !formData?.name) {
            setMessage({ type: "error", text: "Todos os campos são obrigatórios!" });
            return;
        }

        try {
            await api.newTest(formData, token ? token : "");
            navigate("/app/disciplinas");
        } catch (error: Error | AxiosError | any) {
            if (error.response) {
                setMessage({
                    type: "error",
                    text: error.response.data,
                });
                return;
            }

            setMessage({
                type: "error",
                text: "Erro, tente novamente em alguns segundos!",
            });
        }
    }

    return (
        <>
            <Divider sx={{ marginBottom: "35px", marginTop: "25px" }} />
            <Box
                sx={{
                    marginX: "auto",
                    width: "700px",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                    }}
                >
                    <Button
                        variant="outlined"
                        onClick={() => navigate("/app/disciplinas")}
                    >
                        Disciplinas
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => navigate("/app/pessoas-instrutoras")}
                    >
                        Pessoa Instrutora
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => navigate("/app/adicionar")}
                    >
                        Adicionar
                    </Button>
                </Box>
                <Form onSubmit={handleSubmit}>
                    <Autocomplete
                        id="teacher"
                        options={getTeachersOptions(teachersDisciplines)}
                        freeSolo
                        inputValue={formData.teacher}
                        onInputChange={handleInputChange}
                        sx={{ marginBottom: "16px", width: "450px" }}
                        renderInput={(params) => <TextField
                            {...params}
                            label="Digite o nome do professor"
                        />}
                    />
                    <Autocomplete
                        id="discipline"
                        options={getDisciplinesOptions(teachersDisciplines)}
                        freeSolo
                        inputValue={formData.discipline}
                        onInputChange={handleInputChange}
                        sx={{ marginBottom: "16px", width: "450px" }}
                        renderInput={(params) => <TextField
                            {...params}
                            label="Digite o nome da disciplina"
                        />}
                    />
                    <Autocomplete
                        id="category"
                        options={getCategoriesOptions(categories)}
                        freeSolo
                        inputValue={formData.category}
                        onInputChange={handleInputChange}
                        sx={{ marginBottom: "16px", width: "450px" }}
                        renderInput={(params) => <TextField
                            {...params}
                            label="Digite o nome da categoria"
                        />}
                    />
                    <Autocomplete
                        id="pdfUrl"
                        options={[]}
                        freeSolo
                        inputValue={formData.pdfUrl}
                        onInputChange={handleInputChange}
                        sx={{ marginBottom: "16px", width: "450px" }}
                        renderInput={(params) => <TextField
                            {...params}
                            label="Digite a URL da prova"
                        />}
                    />
                    <Autocomplete
                        id="name"
                        options={[]}
                        freeSolo
                        inputValue={formData.name}
                        onInputChange={handleInputChange}
                        sx={{ marginBottom: "16px", width: "450px" }}
                        renderInput={(params) => <TextField
                            {...params}
                            label="Digite o nome da prova"
                        />}
                    />
                    <Button variant="contained" type="submit">
                        Adicionar Prova
                    </Button>
                </Form>
            </Box>
        </>
    );

    function getTeachersOptions(teachersDisciplines: TestByTeacher[]) {
        let stringFiedTeachers = teachersDisciplines.map((teacherDiscipline) => JSON.stringify(teacherDiscipline.teacher));
        stringFiedTeachers = [...new Set(stringFiedTeachers)];

        const teachers = stringFiedTeachers.map((teacher) => JSON.parse(teacher));
        return teachers.map(teacher => {
            return {
                label: teacher.name,
                id: teacher.id
            }
        });
    }

    function getDisciplinesOptions(teachersDisciplines: TestByTeacher[]) {
        const filteredTeacherDisciplines = teachersDisciplines.filter(element => element.teacher.name === formData.teacher);
        if (filteredTeacherDisciplines.length === 0) return [];
        
        const disciplines = filteredTeacherDisciplines.map((teacherDiscipline) => teacherDiscipline.discipline);
        return disciplines.map(discipline => {
            return {
                label: discipline.name,
                id: discipline.id
            };
        });
    }

    function getCategoriesOptions(categories: Category[]) {
        return categories.map(category => {
            return {
                label: category.name,
                id: category.id
            };
        });
    }
}

export default NewTest;