# Projekt jest oparty na architekrurze CLEAN i DDD - na tyle na ile potrafie korzystać z Reacta :)

W projekcie znajduje sie folder o nazwie domain który zawiera modele domenowe (value objects) i przypadki użycia (jako hooki)
Wszystkie operacje które mogą być wykonane w warswtie UI powinny (?) być możliwe do obsłuzenia wykorzystujac tylko useCase (przypadki użycia)

W folderze data (warstwa dostępu do danych) znajdują się implementacje interfejsów repozytoriów z domeny (domain/data/repository)
oraz encje (Entity) Encje nie powinny być używane poza warstwą dostępu do danych - czyli poza repozytoriami.
Założenie jest takie żeby domena nie miała żadnych zależności za to wszystko zależało od domeny (IoC). W ten sposób mamy jedno źródło prawdy (SSOT)
i (w teorii) łatiej jest debugować

useCase są oparte o proste skończone maszyny stanowe - mogą mieć max jeden stan na raz - ponownie w celu ułatwienia debugowania i zachowania 
jednostronnego przepływu danych. Można by dodać reduxa albo coś takiego ale wydaje mi sie że to co jest jest wystarczające przy tak małym projekcie.

Logowanie i stan autentykacji jest rozwiązany za pomocą contextu - ponownie najprosze rozwiązanie bo i projekt jest prosty :D

### WAŻNE!
Nie działa dodawanie i nie jest zaimplementowana edycja artykułów bo backend nie działa xd Podobnie dodawanie komentarzy - brak endpointu na backu
Jak backend sie ogarnie to trzeba będzie dodać

# TODO
- Walidacja przejść pomiędzy stanami w useCase - np nie powinno dać sie przejść ze stanu INIT do stanu ERROR bez przejścia przez stan LOADING itp. (mało ważne)
- warstwa UI - komponenty widoki itd (bardzo ważne)
- wysyłanie zdjęć jako tablica bajtów i pobieranie i wyświetlanie ich też jako tablica bajtów - podobno sie da - wykracza to poza zakres moich umiejętnosci w JS XD

